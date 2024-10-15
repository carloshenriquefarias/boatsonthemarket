import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilo para o React Quill

const TextViewer = ({ content }: any) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      readOnly={true}
      modules={{ toolbar: false }}
    />
  );
};

export default TextViewer;
