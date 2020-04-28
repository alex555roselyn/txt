/* eslint-disable */
	var keycloak = {
		"url": 'http://172.19.12.12:8080/auth',
		"realm": "WACH",
		"flow": "hybrid",
		"auth_uri": "http://190.190.70.162:8090/auth/realms/marcaciones/protocol/openid-connect/auth",
		"clientId": "ACHFormularios",
		"client_secret": "6235876e-d7d8-4b07-a2d0-3ce7d44c581e",
		"token-store": "cookie",
		"userinfo_uri": "http://172.19.12.12:8080/auth/realms/WACH/protocol/openid-connect/userinfo",
		"token_uri": "http://172.19.12.12:8080/auth/realms/WACH/protocol/openid-connect/token",
		"token_introspection_uri": "http://172.19.12.12:8080/auth/realms/WACH/protocol/openid-connect/token/introspect"
	}
export default keycloak;
