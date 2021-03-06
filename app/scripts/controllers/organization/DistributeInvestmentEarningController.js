(function (module) {
    mifosX.controllers = _.extend(module, {
        DistributeInvestmentEarningController: function (scope, resourceFactory, location, dateFilter) {
            scope.product = [];
            scope.formData = {};
            scope.restrictDate = new Date();
            scope.isSuccess = false;
            resourceFactory.loanProductResource.getAllLoanProducts(function (data) {
                scope.product = data;

            });

            scope.submitAndDistributeInvestmentEarning  = function () {
                scope.productId = [];
                scope.productId = this.formData.productId;
                this.formData.productId;
                var distributionDate = dateFilter(scope.formData.distributionDate,'yyyy-MM-dd');
                this.formData.distributionDate = distributionDate;
                resourceFactory.investmentBatchJob.save(this.formData, function (data) {
                    scope.isSuccess = true;
                });
            };
            scope.back = function(){
                location.path('/organization');
            }
        }
    });
    mifosX.ng.application.controller('DistributeInvestmentEarningController', ['$scope', 'ResourceFactory', '$location', 'dateFilter', mifosX.controllers.DistributeInvestmentEarningController]).run(function ($log) {
        $log.info("DistributeInvestmentEarningController initialized");
    });
}(mifosX.controllers || {}));
