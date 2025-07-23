document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        // No hay token, redirigir al login
        window.location.href = "../../../index.html";
        return;
    }

    const url = config.getServiceUrl("funcionariosService") + "/actual-usuario";

    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Token inválido o expirado");
            }
            return response.json();
        })
        .then(data => {
            console.log("Usuario autenticado:", data.username || data.documento);
            // Aquí podrías validar roles si deseas con data.authorities
        })
        .catch(error => {
            console.warn("Redirigiendo al login:", error);
            localStorage.removeItem("authToken");
            window.location.href = "../../../index.html";
        });
});
