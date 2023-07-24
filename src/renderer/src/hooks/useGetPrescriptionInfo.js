import { getRequest } from "../utils/axiosRequests";

export const getPrescriptionInfo = (type, activeOrganizationId) => {
  let url = '';
  if (type === 'header') {
    url = `settings/prescription-header?organizationId=${activeOrganizationId}`
  } else if (type === 'footer') {
    url = `settings/prescription-footer?organizationId=${activeOrganizationId}`
  } else if (type === 'prescriptionItem') {
    url = `settings/prescription-item-setting?organizationId=${activeOrganizationId}`
  } else if (type === 'prescriptionPrint') {
    url = `settings/prescription-print-setting?organizationId=${activeOrganizationId}`
  } else if (type === 'patientItem') {
    url = `settings/prescription-patient-item-setting?organizationId=${activeOrganizationId}`
  } else if (type === 'specialty') {
    url = `specialities`
  }
    return getRequest(url);
}