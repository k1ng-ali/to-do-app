import { FiClipboard } from "react-icons/fi";
import { LuClipboardList, LuClipboardMinus, LuClipboardCheck } from "react-icons/lu";
import "./Styles/MenuTitle.css"
interface MenuTitleProps {
    title: "To-Do" | "В процессе" | "В ожидании" | "Готово"
}
export default function MenuTitle(props: MenuTitleProps) {
    return (
        <div className={"menu-title"}>
            {props.title === "To-Do" && <FiClipboard className={"ico"}/>}
            {props.title === "В процессе" && <LuClipboardList className={"ico"}/>}
            {props.title === "В ожидании" && <LuClipboardMinus className={"ico"}/>}
            {props.title === "Готово" && <LuClipboardCheck className={"ico"}/>}
            <h1>{"To-Do"}</h1>
        </div>
    )
}
