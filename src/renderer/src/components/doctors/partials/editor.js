import React, { Component } from 'react';
import { useRef } from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';

function Editor({ data, setData, height = 600 }) {
  const editorRef = useRef();

  return (
    <TinyEditor
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        selector: 'textarea#open-source-plugins',
        plugins:
          'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: false,
        toolbar_sticky_offset: 108,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        importcss_append: true,
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */

          input.onchange = function () {
            var file = this.files[0];
            var url = URL.createObjectURL(file);
            console.log('got file: ', url);
            cb(url, { title: file.name });
          };

          input.click();
        },
        templates: [
          {
            title: 'New Table',
            description: 'creates a new table',
            content:
              '<div className="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          {
            title: 'Starting my story',
            description: 'A cure for writers block',
            content: 'Once upon a time...',
          },
          {
            title: 'New list with dates',
            description: 'New List with dates',
            content:
              '<div className="mceTmpl"><span className="cdate">cdate</span><br><span className="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: height,
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_className: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        skin: 'oxide',
        content_css: 'default',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
      }}
      initialValue={data}
      onChange={() => setData(editorRef.current.getContent())}
    />
  );
}

export default Editor;
