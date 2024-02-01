import FroalaEditor from "froala-editor";
import { useEffect, useRef } from "react"

export const Editor = () => {
    const editorRef = useRef(null);
    let froalaInstance:any = null;

    useEffect(()=>{
        if(editorRef.current){
            froalaInstance = new FroalaEditor(editorRef.current,{
                // option
                placeholderText: '내용을 입력하세요',
                toolbarButtons: {
                // 툴바 버튼 설정
                moreText: {
                    buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
                    buttonsVisible: 3,
                },
                moreParagraph: {
                    buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'formatULSimple', 'paragraphFormat', 'paragraphStyle', 'lineHeight'],
                    buttonsVisible: 3,
                },
                moreRich: {
                    buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertFile', 'emoticons'],
                    buttonsVisible: 3,
                },
                moreMisc: {
                    buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
                    align: 'right',
                    buttonsVisible: 3,
                },
                },
                events: {
                // 이벤트 설정
                initialized: function () {
                    console.log('Editor initialized');
                },
                },
            });
    };

    return () => {
        // 컴포넌트 언마운트 시 에디터 정리
        if (froalaInstance) {
            froalaInstance.destroy();
            froalaInstance = null;
        }
      };
    }, []);

    return (
        <textarea ref={editorRef}></textarea>
    );
}