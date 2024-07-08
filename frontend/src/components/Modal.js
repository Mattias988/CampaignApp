import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const validationSchema = Yup.object({
  campaignName: Yup.string()
    .matches(/^[A-Za-z0-9 ]{1,20}$/, 'Campaign name must be up to 20 alphanumeric characters')
    .required('Campaign name is required'),
  bidAmount: Yup.number()
    .typeError('Bid amount must be a number')
    .min(1, 'Bid amount must be higher than zero')
    .max(1000000, 'Bid amount must not exceed 1,000,000')
    .required('Bid amount is required'),
  keywords: Yup.string()
    .matches(/^([A-Za-z]+,?\s*){1,10}$/, 'Keywords must contain only letters and be up to 10 words')
    .required('Keywords are required'),
  campaignFund: Yup.number()
    .typeError('Campaign fund must be a number')
    .min(1, 'Campaign fund must be higher than zero')
    .max(1000000, 'Campaign fund must not exceed 1,000,000')
    .required('Campaign fund is required'),
  status: Yup.boolean().required('Status is required'),
  town: Yup.string()
    .matches(/^[\p{L}\s]+$/u, 'Town must contain only letters')
    .required('Town is required'),
  radius: Yup.number()
    .typeError('Radius must be a number')
    .min(1, 'Radius must be higher than zero')
    .max(40075, 'Radius must not exceed the Earth\'s circumference')
    .required('Radius is required'),
});

const townOptions = [
  { value: 'Kraków', label: 'Kraków' },
  { value: 'Warszawa', label: 'Warszawa' },
  { value: 'Poznań', label: 'Poznań' }
];

const Modal = ({ onClose, onSave, campaign }) => {
  const [isCustomTown, setIsCustomTown] = useState(!campaign || !townOptions.find(option => option.value === campaign.town));

  const formik = useFormik({
    initialValues: {
      campaignName: campaign ? campaign.campaignName : '',
      bidAmount: campaign ? campaign.bidAmount : '',
      keywords: campaign ? campaign.keywords.join(', ') : '',
      campaignFund: campaign ? campaign.campaignFund : '',
      status: campaign ? campaign.status : false,
      town: campaign ? campaign.town : '',
      radius: campaign ? campaign.radius : '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newCampaign = {
        ...values,
        keywords: values.keywords.split(',').map(k => k.trim()),
      };
      onSave(newCampaign);
      onClose();
    },
  });

  const handleTownChange = (option) => {
    if (option) {
      formik.setFieldValue('town', option.value);
      setIsCustomTown(false);
    } else {
      formik.setFieldValue('town', '');
      setIsCustomTown(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-4">{campaign ? 'Edit Campaign' : 'Add Campaign'}</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="block mb-2">Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            value={formik.values.campaignName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mb-4 p-2 border rounded"
          />
          {formik.touched.campaignName && formik.errors.campaignName ? (
            <div className="text-red-500">{formik.errors.campaignName}</div>
          ) : null}

          <label className="block mb-2">Bid Amount</label>
          <input
            type="text"
            name="bidAmount"
            value={formik.values.bidAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mb-4 p-2 border rounded"
          />
          {formik.touched.bidAmount && formik.errors.bidAmount ? (
            <div className="text-red-500">{formik.errors.bidAmount}</div>
          ) : null}

          <label className="block mb-2">Keywords (comma separated)</label>
          <input
            type="text"
            name="keywords"
            value={formik.values.keywords}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mb-4 p-2 border rounded"
          />
          {formik.touched.keywords && formik.errors.keywords ? (
            <div className="text-red-500">{formik.errors.keywords}</div>
          ) : null}

          <label className="block mb-2">Campaign Fund</label>
          <input
            type="text"
            name="campaignFund"
            value={formik.values.campaignFund}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mb-4 p-2 border rounded"
          />
          {formik.touched.campaignFund && formik.errors.campaignFund ? (
            <div className="text-red-500">{formik.errors.campaignFund}</div>
          ) : null}

          <label className="block mb-2">Status</label>
          <input
            type="checkbox"
            name="status"
            checked={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mb-4"
          />
          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-500">{formik.errors.status}</div>
          ) : null}

          <label className="block mb-2">Town</label>
          <Select
            name="town"
            options={townOptions}
            onChange={handleTownChange}
            onBlur={formik.handleBlur}
            value={townOptions.find(option => option.value === formik.values.town)}
            isClearable
            className="w-full mb-4"
          />
          {isCustomTown && (
            <input
              type="text"
              name="town"
              value={formik.values.town}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter a town"
              className="w-full mb-4 p-2 border rounded"
            />
          )}
          {formik.touched.town && formik.errors.town ? (
            <div className="text-red-500">{formik.errors.town}</div>
          ) : null}

          <label className="block mb-2">Radius</label>
          <input
            type="text"
            name="radius"
            value={formik.values.radius}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full mb-4 p-2 border rounded"
          />
          {formik.touched.radius && formik.errors.radius ? (
            <div className="text-red-500">{formik.errors.radius}</div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
