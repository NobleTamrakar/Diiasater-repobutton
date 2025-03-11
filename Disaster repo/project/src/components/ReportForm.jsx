import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

const ReportForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    reportType: 'missing-person',
    fullName: '',
    lastSeenLocation: '',
    dateTime: new Date(),
    description: '',
    adultsAffected: '0',
    kidsAffected: '0',
    photo: null,
    phone: '',
    email: '',
    emergencyStatus: 'normal'
  });

  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check for urgent kid alert
    if (name === 'kidsAffected' && parseInt(value) > 5) {
      toast.error('URGENT: High number of children affected! Escalating priority.', {
        duration: 5000,
      });
      setFormData(prev => ({ ...prev, emergencyStatus: 'urgent' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        toast.error('File size must be less than 25MB');
        fileInputRef.current.value = '';
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and PDF files are allowed');
        fileInputRef.current.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            lastSeenLocation: `${latitude}, ${longitude}`
          }));
          toast.success('Location detected successfully!');
        },
        () => {
          toast.error('Unable to detect location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a tracking ID
    const trackingId = 'REP' + Date.now().toString().slice(-6);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    toast.success(
      <div>
        <p>Report submitted successfully!</p>
        <p>Tracking ID: {trackingId}</p>
        <p>We will contact you shortly.</p>
      </div>,
      { duration: 5000 }
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-dark-green rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-caribbean-green mb-4">Report Missing Person / Disaster</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Report Type</label>
            <select
              name="reportType"
              value={formData.reportType}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="missing-person">Missing Person</option>
              <option value="disaster">Disaster Incident</option>
            </select>
          </div>

          {formData.reportType === 'missing-person' && (
            <div>
              <label className="form-label">Full Name*</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          )}

          <div>
            <label className="form-label">Last Seen Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="lastSeenLocation"
                value={formData.lastSeenLocation}
                onChange={handleInputChange}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={getLocation}
                className="bg-bangladesh-green hover:bg-mountain-meadow px-4 rounded"
              >
                📍 Detect
              </button>
            </div>
          </div>

          <div>
            <label className="form-label">Date & Time of Incident</label>
            <DatePicker
              selected={formData.dateTime}
              onChange={(date) => setFormData(prev => ({ ...prev, dateTime: date }))}
              showTimeSelect
              dateFormat="Pp"
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-field h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Adults Affected</label>
              <select
                name="adultsAffected"
                value={formData.adultsAffected}
                onChange={handleInputChange}
                className="input-field"
              >
                {[...Array(101)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Kids Affected</label>
              <select
                name="kidsAffected"
                value={formData.kidsAffected}
                onChange={handleInputChange}
                className="input-field"
              >
                {[...Array(101)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Upload Photo (Max 25MB, JPG/PNG/PDF)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Emergency Status</label>
            <select
              name="emergencyStatus"
              value={formData.emergencyStatus}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Submit Report
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-forest hover:bg-basil text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;