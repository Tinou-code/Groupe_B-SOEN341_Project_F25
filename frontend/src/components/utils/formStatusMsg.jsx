//this component is used to display error/confirmation messages in forms
//for login, register, create event
export default function FormStatusMsg({status,msg}) {
    return(
        <div className={"login-msg"+(status===200 || status===201? "-ok":"-error")}>
                {status != 0 ? msg:""}
        </div>
    )
}