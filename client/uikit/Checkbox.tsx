import * as React from "react";
import * as classNames from "classnames";

type Props = {
    value: boolean;
    onToggle: () => void;
    label?: string;
};

export class Checkbox extends React.Component<Props> {
    render() {
        const { value, onToggle, label } = this.props;
        return (
            <div className={classNames("checkbox", { "on": value })}>
                {label && <span>{label}</span>}
                <input type="checkbox" checked={value} onChange={onToggle} />
            </div>
        );
    }
}
