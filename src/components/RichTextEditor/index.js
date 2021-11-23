import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

/*
    yarn add react-draft-wysiwyg draftjs-to-html html-to-draftjs draft-js
*/

class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    submitValue(editorState) {
        const onChange = this.props.onChange;
        onChange && onChange(this.getValue(editorState));
    }


    getValue(editorState) {
        const currentContent = editorState.getCurrentContent();
        return draftToHtml(convertToRaw(currentContent))
    }

    onEditorStateChange (editorState) {
        this.submitValue(editorState);
        this.setState({
            editorState,
        });
    };


    render() {
        const { editorState } = this.state;
        return (
            <>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor editor-box"
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                />
                <textarea
                    disabled
                    name="detail"
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </>
        );
    }
}

RichTextEditor.propTypes = {
    onChange: PropTypes.func
};

export default RichTextEditor;
