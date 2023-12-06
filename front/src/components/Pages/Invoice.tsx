import {useRef} from 'react'
import style from '../styles/invoice.module.css'
// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
const Invoice = () => {
    const ref = useRef<any>();
      const priceBreakdown = useSelector<RootState, any>(
		state => state.booking.booking.inquiry.priceBreakdown
	);
    const guest = useSelector<RootState, any>(
		state => state.booking.booking.guest
	);
    const {bookingConfirmedAt} = useSelector<RootState, any>(
		state => state.booking.booking
	);
    const requestData = useSelector<RootState, any>(
		state => state.booking.booking.requestData
	);
    const property = useSelector<RootState, any>(
		state => state.booking.booking.property
	);
    const meta = [
        {id:1,title:'Nominal Price',price:`₹ ${priceBreakdown.nominalPrice}`},
        {id:2,title:'Cleaning Charges',price:`₹ ${priceBreakdown.cleaningPrice}`},
        {id:3,title:'Add-on services',price:`₹ ${priceBreakdown.addOnServicePrice}`},
        {id:4,title:'Service fee',price:`₹ ${Number(priceBreakdown.serviceCharge.toFixed(2))}`},
        {id:5,title:'GST (18% on service charge)',price:`₹ ${Number(priceBreakdown.gstAmount.toFixed(2))}`}
    ]
    
    const downloadPDF = () => {
        const input = ref.current;
        html2canvas(input).then((canvas:HTMLCanvasElement) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p','mm','a4',true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX,imgY,imgWidth * ratio,imgHeight * ratio);
            pdf.save('invoice.pdf')
        })
    }
  return (
    <>
    <div id='invoiceMain' className={style.invoiceContainer} ref={ref}>
        <img src={process.env.PUBLIC_URL + 'assets/images/logo.svg'} alt="" />
        <h1 className={style.title}>Thinnai Experiences Private Limited</h1>
        
            <div className={style.officeAddress}>
                <LocationOnOutlinedIcon className={style.icon}/>
                <p>7(1)/5-6, 1st STREET KUMARAPPAPURAM TIRUPPUR Coimbatore TN 641601 IN</p>
            </div>
            <div className={style.officeContact}>
                <div>
                    <EmailOutlinedIcon className={style.icon}/>
                    <p>hi@bookmythinnai.com</p>
                </div>
                <div>
                    <LocalPhoneOutlinedIcon className={style.icon}/>
                    <p>9677790546</p>
                </div>
            </div>
        
        <hr className={style.firstHr}/>
        <div className={style.bookingDetails}>
                <h2>Booking Details</h2>
            <div className={style.bookingWrapper}>
                <div>
                    <p>{property.propertyName}</p>
                    <p>{new Date(requestData.bookingFrom).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>{new Date(requestData.bookingFrom).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })} - {new Date(requestData.bookingTo).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <p>{requestData.guestCount} {requestData.guestCount === 1 ? 'Guest' : 'Guests'}</p>
                </div>
                <div className={style.invoiceContainer2}>
                    <div>
                        <p>Invoice No:</p>
                        <p>GST No:</p>
                        <p>Receipt Date:</p>
                    </div>
                    <div>
                        <p>0001231456</p>
                        <p>12345676</p>
                        <p>{new Date(bookingConfirmedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
            
        </div>
        {/* TAX INVOICE */}
        <div className={style.taxInvoice}>
                {/* Header */}
            <h2>TAX INVOICE</h2>
            <div className={style.taxWrapper}>
                <div className={style.taxHeader}>
                    <h4>Description</h4>
                    <h4>Amount</h4>
                </div>
                <div className={style.taxBody}>
                    {meta.map((item) => {
                        const {id,title,price} = item;
                        return <div key={id}>
                                <p>{title}</p>
                                <p>{price}</p>
                            </div>
                    })}
                <hr/>
                </div>
                <div className={style.total}>
                    <h4>Total(INR)</h4>
                    <h4>₹ {priceBreakdown.totalPrice}</h4>
                </div>
            </div>
            
        </div>

        <div className={style.paidBy}>
            <h4>Paid by</h4>
            <p>{guest.firstName} {guest.lastName}</p>
            <p>{guest.email}</p>
            <p>{guest.phone}</p>
        </div>

    </div>
    <div className={style.btnContainer}>
        <button onClick={downloadPDF} className={`${style.button}`}>Download</button>
        <button className={`${style.button}`} onClick={() => window.history.back()}>Close</button>
    </div>
    </>
  )
}

export default Invoice