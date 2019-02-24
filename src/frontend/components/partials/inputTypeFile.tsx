import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { filter } from 'lodash';

interface UploadProps {
    fileTypeRegex: RegExp;
    onFileLoad: (_e: any, file: any) => void;
}

export default class Upload extends React.Component<UploadProps> {
    fileRef: React.RefObject<HTMLInputElement>;

    constructor(props: UploadProps) {
        super(props);
        this.fileRef = React.createRef();
    }
    

    exclusiveProps = [
        'fileTypeRegex',
        'onFileLoad',
        'buttonControl'
    ];

    onInputChange = (e: any) => {
        filter(
            e.target.files,
            (file) => file.type.match(this.props.fileTypeRegex) !== null
        ).forEach(
            (file) => {
                const reader = new FileReader();
                reader.onload = (event) => this.props.onFileLoad(event, file);
                reader.readAsDataURL(file);
            }
        );
    }

    componentDidMount() {
        findDOMNode(this.fileRef.current!)!
            .addEventListener(
                'change',
                this.onInputChange,
                false
            );
    }

    componentWillUnmount() {
        findDOMNode(this.fileRef.current!)!
            .removeEventListener(
                'change',
                this.onInputChange,
                false
            );
    }

    getButtonProps() {
        return Object
            .keys(this.props)
            .filter(
                (name) => this.exclusiveProps.indexOf(name) === -1
            )
            .reduce(
                (acc: any, name: any) => {
                    acc[name] = (this.props as any)[name];
                    return acc;
                },
                {}
            );
    }

    render() {
        return (
            <div style={{position: 'relative', display: 'inline-block', boxSizing: 'border-box'}}>
            {this.props.children}     
            <input
                style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
                type="file"
                ref={this.fileRef}
                multiple
            />
            </div>
        );
    }
}