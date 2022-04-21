export default class API {
    static async runCalculation(payload) {
        try {
            let res = await fetch("/api/calculate", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            return res;
        } catch (error) {
            console.error(error);
        }
    }
}
