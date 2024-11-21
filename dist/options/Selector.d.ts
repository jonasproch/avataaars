import * as React from 'react';
import Option from './Option';
import { OptionContext } from './OptionContext';
export interface Props {
    option: Option;
    defaultOption: React.ComponentClass | string;
}
export default class Selector extends React.Component<Props> {
    static contextType: React.Context<OptionContext | null>;
    optionContext: OptionContext;
    componentDidMount(): void;
    UNSAFE_componentWillUpdate(nextProps: Props & {
        children?: React.ReactNode;
    }): void;
    componentWillUnmount(): void;
    render(): null | undefined;
    private optionContextUpdate;
    private updateOptionValues;
}
