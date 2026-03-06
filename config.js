// config.js
window.config = {
    microservicios: {
        // funcionariosService: 'http://localhost:8080', // Base URL de funcionarios y gestión
        // informesService: 'http://localhost:8080', // Base URL de control de certificados de RTM
        // informesService: 'https://api-informes-rtm-production.up.railway.app', // Base URL de control de certificados de RTM
        // funcionariosService: 'https://api-funcionarios-admin-migracion-production.up.railway.app', // Base URL de funcionarios y gestión

<<<<<<< HEAD

        funcionariosService:  'https://bandwidth-pockets-anatomy-informed.trycloudflare.com',
=======
        funcionariosService: 'https://chemistry-cologne-larger-displaying.trycloudflare.com',
>>>>>>> ac7b9e33b93243f087e09a2a669b23253fcaf458
        informesService: 'https://api-informes-rtm-production.up.railway.app',
    },

    getServiceUrl: function (serviceName) {
        const baseUrl = this.microservicios[serviceName];
        if (baseUrl) {
            return baseUrl;
        } else {
            throw new Error("El microservicio ${serviceName} no está configurado.");
        }

    }
};
