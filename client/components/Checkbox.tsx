import * as React from "react";
import * as classNames from "classnames";

type Props = {
    value: boolean;
    onToggle: () => void;
};

export class Checkbox extends React.Component<Props> {
    render() {
        const { value, onToggle } = this.props;
        return (
            <div className={classNames("checkbox", { "on": value })}>
                <input type="checkbox" checked={value} onChange={onToggle} />
            </div>
        );
    }
}
