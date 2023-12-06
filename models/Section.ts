import { Schema, model } from 'mongoose';

export interface ISection {
	sectionHeading: string;
	policy: {
		policyName: string;
		policyId: string;
		content: string;
		checkbox: string;
		buttons: string[];
	}[];
}

const SectionSchema = new Schema<ISection>({
	sectionHeading: {
		type: String,
		trim: true,
	},
	policy: [
		{
			policyName: {
				type: String,
				trim: true,
			},
			policyId: {
				type: String,
				trim: true,
			},
			content: {
				type: String,
				trim: true,
			},
			checkbox: {
				type: String,
				trim: true,
			},
			buttons: [
				{
					type: String,
					trim: true,
				},
			],
		},
	],
});

export default model<ISection>('section', SectionSchema);
