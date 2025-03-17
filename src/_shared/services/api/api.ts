import axios, { type AxiosError } from "axios";

const apiInstance = axios.create({
	// baseURL: "",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

apiInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

apiInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		try {
			if (error.response) {
				const status = error.response.status;

				switch (status) {
					case 401:
						throw new Error("Unauthorized");

					case 403:
						throw new Error("Forbidden");

					case 404:
						throw new Error("Not Found");

					case 400:
					case 422: {
						const errorMessage = (error.response.data as { message?: string })?.message || "Invalid data provided.";
						throw new Error(errorMessage);
					}

					default:
						if (status >= 500) {
							throw new Error("Internal Server Error");
						}
				}
			} else if (error.request) {
				throw new Error("Network Error");
			} else if (error.code === "ECONNABORTED") {
				throw new Error("Request timeout");
			} else {
				throw new Error(`Unknown error: ${error.message}`);
			}
		} catch (e) {
			return Promise.reject(e);
		}

		return Promise.reject(error);
	},
);

export default apiInstance;
