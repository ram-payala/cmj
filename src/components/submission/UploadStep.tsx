import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { StepComponentProps } from '../../types/submission';

export default function UploadStep({ formData, updateFormData }: StepComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      updateFormData({ files: [...formData.files, ...newFiles] });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, string> = {
      'doc': 'Word Document',
      'docx': 'Word Document',
      'pdf': 'PDF Document',
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet',
      'ppt': 'PowerPoint Presentation',
      'pptx': 'PowerPoint Presentation',
      'txt': 'Text Document',
      'rtf': 'Rich Text Format',
      'zip': 'ZIP Archive',
      'rar': 'RAR Archive',
    };
    return typeMap[extension || ''] || 'Document';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload Files</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Provide any files our editorial team may need to evaluate your submission. In addition to the main work, you may
        wish to submit data sets, conflict of interest statements, or other supplementary files if these will be helpful
        for our editors.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Files</h3>
          <button
            type="button"
            onClick={handleAddFileClick}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <span>+</span> Add File
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {formData.files.length > 0 && (
          <div className="space-y-3">
            {formData.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                  <Upload size={24} className="text-[#4195A3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {getFileType(file.name)} • {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = formData.files.filter((_, i) => i !== index);
                    updateFormData({ files: newFiles });
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {formData.files.length === 0 && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? 'border-[#4195A3] bg-blue-50' : 'border-gray-300'
            }`}
          >
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">
              Upload any files the editorial team will need to evaluate your submission.
            </p>
            <button
              type="button"
              onClick={handleAddFileClick}
              className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
            >
              Upload File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
