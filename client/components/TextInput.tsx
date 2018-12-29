import * as React from "react";
import * as classNames from "classnames";

type styles = "big" | "no-underline";

type Props = {
    className?: styles | styles[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    onSave: () => void;
}

export class TextInput extends React.Component<Props> {
    render() {
        const { className, placeholder, value } = this.props;
        return (
            <input
                className={classNames(className)}
                placeholder={placeholder}
                type="text"
                value={value}
                onKeyDown={this.keyDown}
                onChange={this.change}
                onFocus={this.focus}
                onBlur={this.blur}
            />
        );
    }

    keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            this.props.onSave();
        }
    }

    change = (event: React.ChangeEvent<HTMLInputElement>) => this.props.onChange(event.currentTarget.value);
    focus = (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select();
    blur = (event: React.FocusEvent<HTMLInputElement>) => this.props.onSave();
}
