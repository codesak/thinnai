import React from "react";
import "../../../styles/Detail/sharemodal.scss"

interface shareProps{
    modalVisible:boolean,
    shareData:any,
    handleClose:any,
}

function ShareModal({ modalVisible, shareData, handleClose }:shareProps) {
const [text, setText] = React.useState('Copy')
const handleCopy = ()=>{
  let copyText:any = document.getElementById("__copy__link");
  navigator.clipboard.writeText(copyText?.value);
  setText('Copied')
}

  return (
    <>
      <div className={`${"share-modal"} ${modalVisible ? "opened" : "closed"}`}>
        <section className="modal-header">
          <h3 className="modal-title">Share Via</h3>
          <button className="close-button" onClick={() => handleClose(false)}>
            &times;
          </button>
        </section>
        <section className="modal-body">
          <a href={`mailto:?subject=[SUBJECT]&body=${shareData.url}`} className="__link__to">
            <div className="__img__container">
              <img src="/assets/images/share/gmail.svg" alt="img" />
            </div>
          </a>
          <a href={`https://api.whatsapp.com/send?text='${shareData.text}'%20'${shareData.url}`} data-action="share/whatsapp/share" className="__link__to">
            <div className="__img__container">
              <img src="/assets/images/share/whatsapp.svg" alt="img" />
            </div>
          </a>
          <a href={`http://www.facebook.com/sharer.php?u='${shareData.url}`} className="__link__to">
            <div className="__img__container">
              <img src="/assets/images/share/facebook.svg" alt="img" />
            </div>
          </a>
          <a href={`https://twitter.com/share?url=${shareData.url}&text=${shareData.text}`} className="__link__to">
            <div className="__img__container">
              <img src="/assets/images/share/twitter.svg" alt="img" />
            </div>
          </a>
        </section>
        <section className="modal-footer">
          <input id="__copy__link" type="text" className="modal-footer-link" value={shareData.url} readOnly/>
          <button className="modal-footer-button" onClick={()=>handleCopy()}>{text}</button>
        </section>
      </div>
    </>
  );
}

export default ShareModal;
