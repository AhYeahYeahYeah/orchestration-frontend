import axios from "axios";

const baseUrl = "http://conductor.rinne.top";
const generalBackendPort = "10451";
const conductorPort = "5000";
const version = "v1";

const generalBackendbase = `${baseUrl}:${generalBackendPort}/${version}`;
const authBase = `${generalBackendbase}/auth`;
const entityBase = `${generalBackendbase}/entity`;

const conductorBase = `${baseUrl}:${conductorPort}/api`;

async function poll(fn, fnCondition, ms) {
    let count = 0;
    let result = await fn();
    while (fnCondition(result)) {
        await wait(ms);
        result = await fn();
        count++;
        if (count > 16) {
            break;
        }
    }
    return result;
}

function wait(ms = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export class AuthApi {
    constructor() {
        this.instance = axios.create({
            baseURL: `${authBase}/`,
            timeout: 1050,
            headers: { Accept: "application/json" },
        });
    }

    async customerLogin(data) {
        return await this.instance.post("/clogin", data);
    }

    async adminLogin(data) {
        return await this.instance.post("/alogin", data);
    }
}

export class EntityApi {
    constructor(token) {
        this.instance = axios.create({
            baseURL: `${entityBase}/`,
            timeout: 1050,
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        });
    }

    // Product
    async getProducts() {
        return await this.instance.get("/product");
    }

    async getProduct(pid) {
        return await this.instance.get(`/product/${pid}`);
    }

    async addProduct(data) {
        return await this.instance.post("/product", data);
    }

    async deleteProduct(pid) {
        return await this.instance.delete(`/product/${pid}`);
    }

    async updateProduct(data) {
        return await this.instance.put("/product", data);
    }

    // ServiceInfo
    async getServiceInfo() {
        return await this.instance.get("/serviceinfo");
    }

    async getServiceInfo(sid) {
        return await this.instance.get(`/serviceinfo/${sid}`);
    }

    // Admin
    async getAdmins() {
        return await this.instance.get("/admin");
    }

    async getAdmin(aid) {
        return await this.instance.get(`/admin/${aid}`);
    }

    async addAdmin(data) {
        return await this.instance.post("/admin", data);
    }

    async updateAdmin(data) {
        return await this.instance.put("/admin", data);
    }

    // Customer
    async getCustomers() {
        return await this.instance.get("/customer");
    }

    async getCustomer(cid) {
        return await this.instance.get(`/customer/${cid}`);
    }

    async addCustomer(data) {
        return await this.instance.post("/customer", data);
    }

    async deleteCustomer(cid) {
        return await this.instance.delete(`/customer/${cid}`);
    }

    async updateCustomer(data) {
        return await this.instance.put("/customer", data);
    }

    // CustomerProfile
    async getCustomerProfiles() {
        return await this.instance.get("/customerprofile");
    }

    async getCustomerProfile(cid) {
        return await this.instance.get(`/customerprofile/${cid}`);
    }

    async addCustomerProfile(data) {
        return await this.instance.post("/customerprofile", data);
    }

    async deleteCustomerProfile(cid) {
        return await this.instance.delete(`/customerprofile/${cid}`);
    }

    async updateCustomerProfile(data) {
        return await this.instance.put("/customerprofile", data);
    }

    // Whitelist
    async getWhitelists() {
        return await this.instance.get("/whitelist");
    }

    async getWhitelist(wid) {
        return await this.instance.get(`/whitelist/${wid}`);
    }

    async addWhitelist(data) {
        return await this.instance.post("/whitelist", data);
    }

    async deleteWhitelist(wid) {
        return await this.instance.delete(`/whitelist/${wid}`);
    }

    async updateWhitelist(data) {
        return await this.instance.put("/whitelist", data);
    }

    // Blacklist
    async getBlacklists() {
        return await this.instance.get("/blacklist");
    }

    async getBlacklist(bid) {
        return await this.instance.get(`/blacklist/${bid}`);
    }

    async addBlacklist(data) {
        return await this.instance.post("/blacklist", data);
    }

    async deleteBlacklist(bid) {
        return await this.instance.delete(`/blacklist/${bid}`);
    }

    async updateBlacklist(data) {
        return await this.instance.put("/blacklist", data);
    }

    // UserGroup
    async getUserGroups() {
        return await this.instance.get("/usergroup");
    }

    async getUserGroup(gid) {
        return await this.instance.get(`/usergroup/${gid}`);
    }

    async addUserGroup(data) {
        return await this.instance.post("/usergroup", data);
    }

    async deleteUserGroup(gid) {
        return await this.instance.delete(`/usergroup/${gid}`);
    }

    async updateUserGroup(data) {
        return await this.instance.put("/usergroup", data);
    }

    // Order
    async getOrders() {
        return await this.instance.get("/order");
    }

    async getOrder(oid) {
        return await this.instance.get(`/order/${oid}`);
    }

    async addOrder(data) {
        return await this.instance.post("/order", data);
    }

    // WorkFlow
    async getWorkFlows() {
        return await this.instance.get("/workflow");
    }

    async getWorkFlow(fid) {
        return await this.instance.get(`/workflow/${fid}`);
    }

    async addWorkFlow(data) {
        return await this.instance.post("/workflow", data);
    }

    async deleteWorkFlow(fid) {
        return await this.instance.delete(`/workflow/${fid}`);
    }

    async updateWorkFlow(data) {
        return await this.instance.put("/workflow", data);
    }
}

export class QueryApi {
    async startQuery(id) {
        let fetchReport = () => axios.get(`${conductorBase}/workflow/${id}`);
        let validate = (result) => result.data.status !== "COMPLETED" && result.data.status !== "FAILED";
        return poll(fetchReport, validate, 500);
    }
}
