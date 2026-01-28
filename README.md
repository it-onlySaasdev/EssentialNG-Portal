
```markdown
<div align="center">

![](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
![](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)

</div>

##

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
```

![Architecture Overview](./docs/images/hero-review.png)
```
