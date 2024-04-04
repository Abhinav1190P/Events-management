import React, {
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
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
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        props.onOverrideContent(undefined);

    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
        <div>
            {buttons.map((Button, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Button key={i} {...props} />
            ))}
        </div>
    );
};

const HeadlinesButton = (props) => {
    // When using a click event inside overridden content, mouse down
    // events needs to be prevented so the focus stays in the editor
    // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
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

const SimpleInlineToolbarEditor = () => {
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
        const textAlignmentPlugin = createTextAlignmentPlugin({theme: { alignmentStyles }});
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

    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText("")
    );

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        setEditorState(createEditorStateWithText(text));
    }, []);

    const editor = useRef(null);

    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current?.focus();
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
                    {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
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
                        )
                    }
                </InlineToolbar>
                <SideToolbar />
            </div>
        </React.Fragment>
    );
};

export default SimpleInlineToolbarEditor;
