# Backlog for AssetsBoard

<!-- 
Legend:
- Priority: ‼️ Critical ❗ High  ❕ Normal 
- Status: 🟢 DONE 🟡 IN PROGRESS 🔵 TODO 🔴 BLOCKED 
-->

<!-- 
After complete, write a table for the epics with their priority and status 
Write the table before the list, just at the beginning of the document.
Add internal links to the epics, 
Example:
| Epic                                      | Priority   | Status |
| ----------------------------------------- | ---------- | ------ |
| [E1](#e1-user-management--authentication) | ‼️ Critical | 🔵 TODO |
-->

| Epic | Priority | Status |
|------|----------|--------|
| [E1 User Management & Authentication](#e1-user-management--authentication) | ‼️ Critical | 🔵 TODO |
| [E2 Portfolio Management](#e2-portfolio-management) | ‼️ Critical | 🔵 TODO |
| [E3 Asset Management](#e3-asset-management) | ❗ High | 🔵 TODO |
| [E4 Transaction Processing](#e4-transaction-processing) | ‼️ Critical | 🔵 TODO |
| [E5 Holdings Management](#e5-holdings-management) | ❗ High | 🔵 TODO |
| [E6 API Infrastructure](#e6-api-infrastructure) | ‼️ Critical | 🔵 TODO |


## E1 User Management & Authentication
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO

- Core user authentication system for secure access to investment portfolios

### F1.1 User Registration
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R1 User Authentication
- **Dependencies:** None
- **Links:** No specifications yet

- Users can create accounts with email and password to access the platform

### F1.2 User Login & Session Management
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R1 User Authentication
- **Dependencies:** [F1.1](#f11-user-registration)
- **Links:** No specifications yet

- Users can authenticate with credentials and maintain secure sessions

### F1.3 Password Security
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R1 User Authentication
- **Dependencies:** [F1.1](#f11-user-registration)
- **Links:** No specifications yet

- Implement secure password hashing using Node.js crypto module

---

## E2 Portfolio Management
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO

- Core portfolio creation and management functionality for investment tracking

### F2.1 Create Portfolio
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R2 Portfolio Management
- **Dependencies:** [F1.2](#f12-user-login--session-management)
- **Links:** No specifications yet

- Users can create new investment portfolios with initial cash amounts in USD

### F2.2 Portfolio Balance Tracking
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R2 Portfolio Management, R5 Portfolio Visualization
- **Dependencies:** [F2.1](#f21-create-portfolio)
- **Links:** No specifications yet

- System maintains accurate cash balance for each portfolio

### F2.3 Portfolio Visualization
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R5 Portfolio Visualization
- **Dependencies:** [F2.1](#f21-create-portfolio), [F4.2](#f42-record-sell-transactions)
- **Links:** No specifications yet

- Users can view current portfolio status including assets and remaining cash

---

## E3 Asset Management
- **Priority**: ❗ High, **Status**: 🔵 TODO

- Asset catalog and management system for different investment types

### F3.1 Asset Registration
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R3 Transaction Recording
- **Dependencies:** None
- **Links:** No specifications yet

- System can register and store different asset types (stocks, crypto, etc.)

### F3.2 Asset Catalog
- **Priority**: ❕ Normal, **Status**: 🔵 TODO
- **Project Requirements:** R3 Transaction Recording
- **Dependencies:** [F3.1](#f31-asset-registration)
- **Links:** No specifications yet

- Maintain catalog of available assets with symbols and names

---

## E4 Transaction Processing
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO

- Core buy/sell transaction functionality with business rule validation

### F4.1 Record Buy Transactions
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R3 Transaction Recording, R4 Transaction Validation
- **Dependencies:** [F2.1](#f21-create-portfolio), [F3.1](#f31-asset-registration)
- **Links:** No specifications yet

- Users can record asset purchases with quantity and price validation

### F4.2 Record Sell Transactions
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R3 Transaction Recording, R4 Transaction Validation
- **Dependencies:** [F4.1](#f41-record-buy-transactions), [F5.1](#f51-holdings-calculation)
- **Links:** No specifications yet

- Users can record asset sales with holding quantity validation

### F4.3 Transaction Validation
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** R4 Transaction Validation
- **Dependencies:** [F4.1](#f41-record-buy-transactions)
- **Links:** No specifications yet

- System prevents invalid transactions (insufficient funds/assets)

### F4.4 Transaction History
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R6 Transaction History
- **Dependencies:** [F4.1](#f41-record-buy-transactions), [F4.2](#f42-record-sell-transactions)
- **Links:** No specifications yet

- Users can view complete list of all historical transactions

---

## E5 Holdings Management
- **Priority**: ❗ High, **Status**: 🔵 TODO

- Asset holdings calculation and tracking system

### F5.1 Holdings Calculation
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R5 Portfolio Visualization
- **Dependencies:** [F4.1](#f41-record-buy-transactions)
- **Links:** No specifications yet

- System calculates current asset holdings from transaction history

### F5.2 Holdings Display
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R5 Portfolio Visualization
- **Dependencies:** [F5.1](#f51-holdings-calculation)
- **Links:** No specifications yet

- Users can view current holdings with quantities and average costs

---

## E6 API Infrastructure
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO

- REST API endpoints and data persistence infrastructure

### F6.1 Database Setup
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** All requirements depend on data persistence
- **Dependencies:** None
- **Links:** No specifications yet

- Setup SQLite database with schema for all entities

### F6.2 REST API Endpoints
- **Priority**: ‼️ Critical, **Status**: 🔵 TODO
- **Project Requirements:** All requirements
- **Dependencies:** [F6.1](#f61-database-setup)
- **Links:** No specifications yet

- Implement all REST endpoints for authentication, portfolios, assets, transactions

### F6.3 Data Validation
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** R4 Transaction Validation
- **Dependencies:** [F6.2](#f62-rest-api-endpoints)
- **Links:** No specifications yet

- Input validation and sanitization for all API endpoints

### F6.4 Error Handling
- **Priority**: ❗ High, **Status**: 🔵 TODO
- **Project Requirements:** All requirements
- **Dependencies:** [F6.2](#f62-rest-api-endpoints)
- **Links:** No specifications yet

- Comprehensive error handling and appropriate HTTP status codes

---

## Additional Information

- [Git repository](https://github.com/AIcodeAcademy/AIDDbot)
- [PRD Document](./PRD.md)
- [DOMAIN Models](./DOMAIN.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

> End of BACKLOG for AssetsBoard, last updated on July 28, 2025.
