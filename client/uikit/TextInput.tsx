import * as React from "react";
import * as classNames from "classnames";

import * as styles from "./TextInput.scss";

export const TextInputStyles = {
    large: styles.large,
    noUnderline: styles.noUnderline
};

type Props = {
    className?: string;
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
                className={classNames(styles.input, className)}
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
