import MenuTitle from "./MenuTitle.tsx"
import "./Styles/Header.css"

export default function Header({onCreate}: {onCreate?: () => void}) {
    return (
        <div className={"header"}>
            <div className={"header-container"}>
                <MenuTitle title={"To-Do"}/>
                <button className={"create-button"}
                    onClick={onCreate}>Создать</button>
            </div>
        </div>
    )
}
