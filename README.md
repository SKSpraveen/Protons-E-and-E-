# Secure Software Development (SSD) Assignment

## Group ID
`60_IT22114044`

## Project Overview
This repository contains the security enhancement work carried out for **Protons E& E**, an e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The goal of this assignment was to identify, analyze, and remediate security vulnerabilities in accordance with the OWASP Top 10 guidelines.

Original Project: [https://github.com/SKSpraveen/Protons-E-E.git](https://github.com/SKSpraveen/Protons-E-E.git)  

---

## Security Tools Used

### SonarQube
**SonarQube** is a static code analysis tool that continuously inspects code for bugs, code smells, and security vulnerabilities. In this project, SonarQube was used to scan both the frontend (React) and backend (Node.js/Express) codebases to detect issues such as:
- NoSQL injection
- Insecure coding patterns
- Poor input validation
- Code quality issues

By integrating SonarQube into our workflow, we were able to systematically identify and address critical and high-severity security flaws before deployment.

### Snyk (via `npm audit` / `yarn audit`)
Although the report primarily references `npm audit` and `yarn audit`, these tools serve a similar purpose to **Snyk**—automated dependency vulnerability scanning. They:
- Scan project dependencies for known security vulnerabilities
- Provide severity ratings (low, moderate, high, critical)
- Offer automatic fixes (`npm audit fix`, `yarn audit fix`) or recommend manual updates

We used these tools to ensure both **frontend** and **backend** dependencies were up to date and free from publicly disclosed vulnerabilities, significantly reducing the risk of supply-chain attacks.

---

## Individual Contributions

| Student ID      | Name                     | Contributions |
|-----------------|--------------------------|---------------|
| IT22114044      | Praveen S.K.S            | - Implemented Google OAuth<br>- Fixed NoSQL Injection in Payment API<br>- Strengthened password authentication policy<br>- Performed backend dependency vulnerability checks<br>- Addressed potential CSRF vulnerabilities |
| IT22084668      | S.N.S.B.K.K Semasinghe   | - Fixed weak cryptography in Payment ID generation<br>- Remediated Stored XSS in Advertisement.js<br>- Removed hard-coded API keys and migrated to `.env` |
| IT22602114      | Madushanka L.A.S         | - Mitigated Information Disclosure (e.g., removed `X-Powered-By` header)<br>- Fixed ReDoS vulnerability in email validation regex<br>- Conducted frontend dependency vulnerability checks |
| IT22092274      | Mallawaarachchi U.V.N    | - Secured Cross-Origin Resource Sharing (CORS) policy<br>- Improved data validation and access control in Stock model (Insecure Design)<br>- Integrated Helmet.js for enhanced HTTP security headers |

---

## Security Enhancements Implemented
- ✅ NoSQL Injection protection via input validation & Mongoose schema enforcement  
- ✅ Stored XSS prevention using `sanitize-html`  
- ✅ Strong password policy (8+ chars, with uppercase, lowercase, number, special char)  
- ✅ Cryptographically secure ID generation using `crypto.randomUUID()`  
- ✅ Secure CORS configuration (restricted to trusted origin)  
- ✅ Removal of sensitive headers (`X-Powered-By`)  
- ✅ ReDoS-resistant input validation  
- ✅ Environment-based secret management (`.env`)  
- ✅ Helmet.js for HTTP security headers  
- ✅ Rate limiting to prevent brute-force/DoS attacks  
- ✅ Regular dependency audits (frontend & backend)

---
> 🔒 Security is not a feature—it's a foundation. This project demonstrates a proactive approach to building secure software from the ground up.
