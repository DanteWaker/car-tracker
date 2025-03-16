import axios, { type AxiosError } from "axios";

const apiInstance = axios.create({
	baseURL: "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
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
						localStorage.removeItem("authToken");
						throw new Error(
							"Sessão expirada. Por favor, faça login novamente.",
						);

					case 403:
						throw new Error(
							"Acesso negado. Você não tem permissão para acessar este recurso.",
						);

					case 404:
						throw new Error("Recurso não encontrado");

					case 400:
					case 422: {
						const errorMessage =
							(error.response.data as { message?: string })?.message ||
							"Dados inválidos fornecidos.";
						throw new Error(errorMessage);
					}

					default:
						if (status >= 500) {
							throw new Error(
								"Erro no servidor. Por favor, tente novamente mais tarde.",
							);
						}
				}
			} else if (error.request) {
				throw new Error("Erro de rede. Verifique sua conexão com a internet.");
			} else if (error.code === "ECONNABORTED") {
				throw new Error(
					"A requisição excedeu o tempo limite. Tente novamente.",
				);
			} else {
				throw new Error(`Erro desconhecido: ${error.message}`);
			}
		} catch (e) {
			return Promise.reject(e);
		}

		return Promise.reject(error);
	},
);

export default apiInstance;
