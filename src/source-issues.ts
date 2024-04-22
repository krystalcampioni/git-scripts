import { getLabelIds } from "./get-label-ids";
import { getProjectId } from "./get-project-id";

// The array of issues

export const sourceIssues = [
  {
    title: "[FieldModal] Company Name Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Contact Title Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Company Tax ID Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Company Billing & Shipping Address Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Single Line Text Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Dropdown List Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Radio Buttons Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Multi-line Text Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Multiple Choice Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
  {
    title: "[FieldModal] Number Modal",
    body: "Remove content route, ModalRenderer and ModalContent components, centralize implementation in a single component that uses AppBridgeV4Modal",
  },
];

export const makeIssues = async () => {
  return sourceIssues.map(async (issue) => ({
    ...issue,
    // labels: await getLabelIds(["gsd:40982"]),
  }));
};
