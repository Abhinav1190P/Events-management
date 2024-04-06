import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorState } from "draft-js";
import Editor, { createEditorStateWithText, composeDecorators } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, { Separator } from "@draft-js-plugins/inline-toolbar";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createImagePlugin from "@draft-js-plugins/image";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createFocusPlugin from "@draft-js-plugins/focus";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import { stateToHTML } from 'draft-js-export-html';
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import editorStyles from "./editorStyles.css?inline";

import ImageAdd from "./addImage";
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
} from "@draft-js-plugins/buttons";
import alignmentStyles from './alignmentStyles.css?inline'
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/side-toolbar/lib/plugin.css";
import "@draft-js-plugins/focus/lib/plugin.css";
import "@draft-js-plugins/image/lib/plugin.css";
import "@draft-js-plugins/alignment/lib/plugin.css";

const text =
    "In this editor a toolbar shows up once you select part of the text …";

const HeadlinesPicker = (props) => {
    useEffect(() => {
        setTimeout(() => {
            window.addEventListener("click", onWindowClick);
        });
        window.removeEventListener("click", onWindowClick);
        return () => {
            window.removeEventListener("click", onWindowClick);
        };
    }, []);

    const onWindowClick = () =>
        props.onOverrideContent(undefined);

    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
        <div>
            {buttons.map((Button, i) => (
                <Button key={i} {...props} />
            ))}
        </div>
    );
};

const HeadlinesButton = (props) => {
    const onMouseDown = (event) => event.preventDefault();

    const onClick = () => props.onOverrideContent(HeadlinesPicker);

    return (
        <div
            onMouseDown={onMouseDown}
            className={editorStyles.headlineButtonWrapper}
        >
            <button onClick={onClick} className={editorStyles.headlineButton}>
                H
            </button>
        </div>
    );
};

const SimpleInlineToolbarEditor = ({ club }) => {
    const [
        plugins,
        InlineToolbar,
        SideToolbar,
        AlignmentTool,
        addImage,
        TextAlignment
    ] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        const sideToolbarPlugin = createSideToolbarPlugin();
        const focusPlugin = createFocusPlugin();
        const resizeablePlugin = createResizeablePlugin();
        const blockDndPlugin = createBlockDndPlugin();
        const alignmentPlugin = createAlignmentPlugin();
        const textAlignmentPlugin = createTextAlignmentPlugin({ theme: { alignmentStyles } });
        const decorator = composeDecorators(
            resizeablePlugin.decorator,
            alignmentPlugin.decorator,
            focusPlugin.decorator
        );
        const imagePlugin = createImagePlugin({ decorator });
        return [
            [
                inlineToolbarPlugin,
                sideToolbarPlugin,
                blockDndPlugin,
                focusPlugin,
                alignmentPlugin,
                resizeablePlugin,
                imagePlugin,
                textAlignmentPlugin
            ],
            inlineToolbarPlugin.InlineToolbar,
            sideToolbarPlugin.SideToolbar,
            alignmentPlugin.AlignmentTool,
            imagePlugin.addImage,
            textAlignmentPlugin.TextAlignment,
        ];
    }, []);
    const api = useAxiosPrivate()
    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText("")
    );

    useEffect(() => {
        setEditorState(createEditorStateWithText(text));
    }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
    };


    const handleSave = async () => {
        const contentState = editorState.getCurrentContent();
        const html = stateToHTML(contentState);
        await api.post('/api/admin/club-create-about', { club_id: club._id, htmlContent: html })
            .then(({ data }) => {
                console.log(data)
            })
    };

    return (
        <React.Fragment>
            <ImageAdd
                editorState={editorState}
                onChange={onChange}
                modifier={addImage}
            />
            <div className={editorStyles.editor} onClick={focus}>
                <Editor
                    editorKey="editor"
                    editorState={editorState}
                    onChange={onChange}
                    plugins={plugins}
                    ref={(element) => {
                        editor.current = element;
                    }}
                />
                <AlignmentTool />

                <InlineToolbar>
                    {(externalProps) => (
                        <div>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <Separator />
                            <HeadlinesButton {...externalProps} />
                            <UnorderedListButton {...externalProps} />
                            <OrderedListButton {...externalProps} />
                            <BlockquoteButton {...externalProps} />
                            <TextAlignment {...externalProps} />
                        </div>
                    )}
                </InlineToolbar>
                <SideToolbar />
            </div>
            <button onClick={handleSave}>Save</button>
        </React.Fragment>
    );
};

export default SimpleInlineToolbarEditor;
