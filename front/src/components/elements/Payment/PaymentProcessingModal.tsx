import React from 'react'

function PaymentProcessingModal({
  hasIFrameLoaded,
  setHasIFrameLoaded,
  encReqURL,
}: {
  hasIFrameLoaded: boolean
  setHasIFrameLoaded: (hasIFrameLoaded: boolean) => void
  encReqURL: string
}) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ padding: '0px' }}
    >
      <div className="modal-dialog" role="document">
        <div
          className="modal-content"
          style={{ minHeight: '700px', width: '100%' }}
        >
          {!hasIFrameLoaded && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '700px' }}
            >
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          <iframe
            title="ccavenue"
            onLoad={() => setHasIFrameLoaded(true)}
            width="100%"
            style={{
              height: `${hasIFrameLoaded ? '90vh' : '0px'}`,
            }}
            scrolling="Yes"
            frameBorder="0"
            id="paymentFrame"
            src={encReqURL}
            // src={
            //   'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
            // }
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentProcessingModal
