import "./UIKitsStyle.css"
interface IndicatorProps {
    status: "pending" | "done" | "inProgress" | "def";
    className?: string
}
export function Indicator (props: IndicatorProps) {
    return (
        <div className={props.className}>
            <div className={`indicator ${props.status}`}>
            </div>
        </div>
    );
}

interface StatusProps {
    status: "pending" | "done" | "inProgress";
    def?: boolean;
    onClick?: () => void;
}
export function Status (props: StatusProps) {
    return (
        <div
            className={`status ${props.def ? "def" : props.status}`}
            onClick={(e) => {
                e.stopPropagation();
                props.onClick?.();}}>
            <p>
                {props.status === "pending" && "В ожидании"}
                {props.status === "inProgress" && "В процессе"}
                {props.status === "done" && "Готово"}
            </p>
        </div>
    )
}

