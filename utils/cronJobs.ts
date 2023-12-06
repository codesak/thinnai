import Inquiry from '../models/Inquiry';
import { createNotification } from './notification';
import { CronJob } from 'cron';
import { Types } from 'mongoose';

export const cronJobs: ExtCronJob[] = [];

interface ExtCronJob extends CronJob {
	id?: string;
}

const createCronJob = (
	inquiryId: Types.ObjectId,
	isInquiryCron: boolean,
	cronTime: Date | string,
	notificationType: string,
	notificationReceiver: string = 'guest'
) => {
	try {
		const job: ExtCronJob = new CronJob(
			cronTime,
			function (this: CronJob) {
				let inquiry: any = Inquiry.findOne({ _id: inquiryId });
				if (isInquiryCron) {
					inquiry.status = 'cancelled';
					inquiry.save();
				}

				let receiver: Types.ObjectId = new Types.ObjectId();
				if (notificationReceiver === 'guest') {
					receiver = inquiry.guest;
				} else if (notificationReceiver === 'host') {
					receiver = inquiry.host;
				}

				createNotification(notificationType, receiver);

				this.stop();
			},
			null,
			true,
			'Asia/Kolkata'
		);
		if (isInquiryCron) {
			job.id = inquiryId.toString();
		} else {
			job.id = `${inquiryId}_${notificationType}`;
		}

		console.log(`CronJob Created: ${job.id}`);

		cronJobs.push(job);

		return job.id;
	} catch (error) {
		console.log(`CronJob Create: ${error}`);
	}
};

const stopCronJob = (jobId: string) => {
	try {
		const job = cronJobs.find(job => job.id === jobId);
		if (job) {
			job.stop();
			cronJobs.splice(cronJobs.indexOf(job), 1);
		}
	} catch (error) {
		console.log(`CronJob Stop: ${error}`);
	}
};

export { createCronJob, stopCronJob };
