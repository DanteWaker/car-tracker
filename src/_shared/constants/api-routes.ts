/**
 * API Routes constants
 *
 * This file centralizes all API endpoint routes used across the application.
 * Always use these constants instead of hardcoding routes in services or components.
 */

export const API_ROUTES = {
	// Client routes
	CLIENTS: {
		BASE: "/api/clients",
		BY_ID: (id: string) => `/api/clients/${id}`,
	},

	// Sales routes
	SALES: {
		BASE: "/api/sales",
		BY_ID: (id: string) => `/api/sales/${id}`,
	},

	// Lead routes
	LEADS: {
		BASE: "/api/leads",
		BY_ID: (id: string) => `/api/leads/${id}`,
	},

	// Panel routes
	PANELS: {
		BASE: "/api/panels",
		BY_ID: (id: string) => `/api/panels/${id}`,
	},

	// Inverter routes
	INVERTERS: {
		BASE: "/api/inverters",
		BY_ID: (id: string) => `/api/inverters/${id}`,
	},

	// Installation types routes
	INSTALLATION_TYPES: {
		BASE: "/api/installation-types",
		BY_ID: (id: string) => `/api/installation-types/${id}`,
	},

	// Classification routes
	CLASSIFICATIONS: {
		BASE: "/api/classifications",
		BY_ID: (id: string) => `/api/classifications/${id}`,
	},

	// Payment methods routes
	PAYMENT_METHODS: {
		BASE: "/api/payment-methods",
		BY_ID: (id: string) => `/api/payment-methods/${id}`,
	},

	// Attachments routes
	ATTACHMENTS: {
		BASE: "/api/attachments",
		BY_ID: (id: string) => `/api/attachments/${id}`,
		UPLOAD: "/api/attachments/upload",
		BY_ENTITY: (entityType: string, entityId: string) =>
			`/api/attachments?entityType=${entityType}&entityId=${entityId}`,
	},

	// Payment schedules routes
	PAYMENT_SCHEDULES: {
		BASE: "/api/payment-schedules",
		BY_ID: (id: string) => `/api/payment-schedules/${id}`,
		BY_SALE: (saleId: string) => `/api/payment-schedules?saleId=${saleId}`,
	},

	// Solar installations routes
	SOLAR_INSTALLATIONS: {
		BASE: "/api/solar-installations",
		BY_ID: (id: string) => `/api/solar-installations/${id}`,
		BY_CLIENT: (clientId: string) =>
			`/api/solar-installations?clientId=${clientId}`,
	},

	// User routes
	USER: {
		CURRENT: "/api/user",
		PROFILE: "/api/user/profile",
	},

	// Add other API routes as needed, organized by domain
	// Example:
	// PROJECTS: {
	//   BASE: '/api/projects',
	//   BY_ID: (id: string) => `/api/projects/${id}`,
	// },
};
