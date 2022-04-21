from unicodedata import decimal


class AllocationCalculator:
    def __init__(self, payload):
        self.investors = payload["investor_amounts"]
        self.total_available_allocation = float(payload["allocation_amount"])
        self.allocation_type = None
        self.standard = 'standard'
        self.historical = 'historical'

    def _make_api_response(self):
        response = []
        key = None
        if self.allocation_type == self.standard:
            key = "requested_amount"
        elif self.allocation_type == self.historical:
            key = "prorated_amount"

        for i in self.investors:
            response.append(
                {"name": i['name'], "prorated_amount": "{:.2f}".format(i[key])})

        return response

    def _sum_investor_amounts(self, key):
        sum = 0
        for i in self.investors:
            sum += i[key]
        return sum

    def _calc_proration(self):
        average_sum = self._sum_investor_amounts("average_amount")
        leftovers = 0

        for inv in self.investors:
            # Total * (Investor Avg. / (Sum of Investor Avgs.)
            prorated_amount = self.total_available_allocation * \
                (inv["average_amount"]/average_sum)
            inv['prorated_amount'] = prorated_amount
            if inv["requested_amount"] < prorated_amount:
                inv['prorated_amount'] = inv["requested_amount"]
                leftovers += abs(inv["requested_amount"] - prorated_amount)
            else:
                capacity = abs(inv["requested_amount"] - prorated_amount)
                if capacity > 0:
                    inv['additional_capacity'] = capacity

        # Check for leftovers
        for inv in self.investors:
            if "additional_capacity" in inv:
                if inv['additional_capacity'] >= leftovers:
                    inv['prorated_amount'] += leftovers
                    leftovers = 0
                else:
                    diff = abs(inv['additional_capacity'] - leftovers)
                    inv['prorated_amount'] += diff
                    leftovers = diff

    def calculate(self):
        request_sum = self._sum_investor_amounts("requested_amount")
        if self.total_available_allocation > request_sum:
            self.allocation_type = self.standard
            return self._make_api_response()
        else:
            self.allocation_type = self.historical
            self._calc_proration()
            return self._make_api_response()
