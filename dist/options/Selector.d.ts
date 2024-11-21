import * as React from 'react';
import Option from './Option';
export interface Props {
    option: Option;
    defaultOption: React.ComponentClass | string;
}
export default class Selector extends React.Component<Props> {
    static contextType: React.Context<import("./OptionContext").OptionContext | null>;
    componentDidMount(): void;
    UNSAFE_componentWillUpdate(nextProps: Props & {
        children?: React.ReactNode;
    }): void;
    componentWillUnmount(): void;
    render(): null | undefined;
    private optionContextUpdate;
    private updateOptionValues;
}
