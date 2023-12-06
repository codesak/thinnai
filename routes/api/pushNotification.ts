import { Router, Request, Response } from 'express';
import FCM  from 'fcm-node'
var serverKey = 'AAAA_Y8Etnk:APA91bEn6sNLmbmFJxund7N88Ugg7JHdAjWVGQHstN1JaerSrAvPSenCyel2gLV8GpWNU0xtPHcscTYf1-iwp8NQn2NaMpv5cI4qTnSX0IzzXe3MGISwZaNc9SIKU63pEvfQ2MJP5vc5';
var fcm = new FCM(serverKey);

const router:Router = Router();

router.get('/',(req:Request,res:Response)=>{
    res.status(200).send("her is good route")
})

router.post('/sendtouser',(req:Request,res:Response)=>{
    //console.log(req.body)
    var message = {
        to: req.body.ourtoken,
            notification: {
                title: 'Thinnai',
                body: 'Welcome to our page!',
                
            },
        };

        fcm.send(message, function(err:any, response:Response) {
            if (err) {
                console.log("Something went wrong!"+err);
                console.log("Response:! "+response);
            } else {
                // showToast("Successfully sent with response");
                console.log("Successfully sent with response: ", response);
                res.status(200).send("notification sent!")
            }
        });
    })

export default router
