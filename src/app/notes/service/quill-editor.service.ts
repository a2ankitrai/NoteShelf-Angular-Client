import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuillEditorService {

  placeholderText = 'Create an Awesome Note..';
  style = {
    'min-height': '250px',
    'display': 'block',
    'border-radius': '0.25rem',
    'border': '1px solid #ced4da',
    'line-height': '1.5',
    'background-clip': 'padding-box',
    'font-size': '1rem',
    'transition': 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
  };


  toolBar = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      // ['clean'],                                         // remove formatting button

      ['link', 'image', 'video', 'formula']                         // link and image, video, formula for fx
    ]
  };

  constructor() { }
}
