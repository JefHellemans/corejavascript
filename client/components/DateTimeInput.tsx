import * as React from "react";

type Props = {
    value?: Date;
};

export class DateTimeInput extends React.Component<Props> {
    render() {
        const { value } = this.props;
        return (
            <div className="datetime">
                {!value && <span>Due Date</span>}
            </div>
        );
    }
}
