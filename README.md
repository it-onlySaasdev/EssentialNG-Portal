<div align="center">
  
<!-- Profile Views Counter -->
<img src="https://komarev.com/ghpvc/?username=it-onlySaasdev&label=Profile%20Views&color=0e75b6&style=flat-square" alt="Profile Views" />

<!-- GitHub Stats Card -->
<img src="https://github-readme-stats.vercel.app/api?username=it-onlySaasdev&show_icons=true&theme=radical&hide_border=true" width="48%" alt="GitHub Stats" />

<!-- Top Languages Card -->
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=it-onlySaasdev&layout=compact&theme=radical&hide_border=true" width="48%" alt="Top Languages" />

<!-- GitHub Streak Stats -->
<img src="https://github-readme-streak-stats.herokuapp.com/?user=it-onlySaasdev&theme=radical&hide_border=true" width="100%" alt="GitHub Streak" />

<!-- GitHub Activity Graph -->
<img src="https://github-readme-activity-graph.vercel.app/graph?username=it-onlySaasdev&theme=react-dark&bg_color=1a1b27&hide_border=true" width="100%" alt="GitHub Activity Graph" />

<!-- Trophy Stats -->
<img src="https://github-profile-trophy.vercel.app/?username=it-onlySaasdev&theme=radical&no-frame=true&row=2&column=4" width="100%" alt="GitHub Trophies" />

<!-- Wakatime Stats (Optional - if you use Wakatime) -->
<!-- <img src="https://github-readme-stats.vercel.app/api/wakatime?username=it-onlySaasdev&theme=radical&hide_border=true" width="100%" alt="Wakatime Stats" /> -->

</div>

<div align="center">

![](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
![](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)

</div>


<div align="center">

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React SPA]
        B[Mobile Responsive]
    end
    
    subgraph "Gateway Layer"
        C[API Gateway]
        D[Load Balancer]
    end
    
    subgraph "Service Layer"
        E[Auth Service]
        F[E-jobs Service]
        G[Hotel Services]
        H[Companion Service]
        I[Venue Service]
        J[Payment Service]
    end
    
    subgraph "Data Layer"
        K[(Shared PostgreSQL)]
        L[(Service Databases)]
        M[Redis Cache]
    end
    
    A --> C
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
    C --> J
    
    E --> K
    F --> L
    G --> L
    H --> L
    I --> L
    J --> K
    
    style A fill:#61dafb
    style E fill:#4CAF50
    style F fill:#2196F3
    style G fill:#FF9800
````
![Architecture Overview](./docs/images/hero-review.png)
![dashboard Overview](./docs/images/users_Dashboard.png)
![mobile Overview](./docs/images/mobile_devices.png)
