import React from "react";
import {Indicator, Status} from "../UI-kits/UIKits.tsx";
import "./Styles/Status.css"
interface StatusProps {
    status: "pending" | "done" | "inProgress";
    onClick?: (status: "pending" | "done" | "inProgress") => void;
}
export default function StatusBar(props: StatusProps) {
    const [isChoose, setIsChoose] = React.useState(false);
    const toggle = (status: "pending" | "done" | "inProgress") => {
        setIsChoose(!isChoose);
        props.onClick?.(status);
    }
    return (
        <div className={"StatusBar"}>
            {(props.status === "pending" || isChoose) &&
                <Status status={isChoose ? "pending" : props.status}
                        def={props.status !== "pending" ? true : false }
                        onClick={() => toggle("pending")}
                />}
            {(props.status === "inProgress" || isChoose) &&
                <Status status={isChoose ? "inProgress" : props.status}
                        def={props.status !== "inProgress" ? true : false }
                        onClick={()=> toggle("inProgress")}/>}
            {(props.status === "done" || isChoose) &&
                <Status status={isChoose ? "done" : props.status}
                        def={props.status !== "done" ? true : false }
                        onClick={() => toggle("done")}/>}
            { isChoose ? "" : (
            <Indicator status={props.status} className={"Indicator"}/>)
            }
            { isChoose ? "" : (
            <Indicator status={props.status === "pending" ? "def" : props.status} className={"Indicator"}/>)}
            { isChoose ? "" : (
            <Indicator status={props.status !== "done" ? "def" : props.status}
                       className={"Indicator"}/>)}
        </div>
    )
}
