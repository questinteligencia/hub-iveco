.PHONY: build-runtimeDependenciesLayer build-lambda-common
.PHONY: build-hubIvecoSalesValidatorProduction
# .PHONY: build-hubIvecoSalesValidatorStaging
.PHONY: build-hubIvecoSalesProcessorProduction
# .PHONY: build-hubIvecoSalesProcessorStaging
.PHONY: build-hubIvecoSalesMonitorProduction
# .PHONY: build-hubIvecoSalesMonitorStaging
.PHONY: build-hubIvecoAfterSalesValidatorProduction
# .PHONY: build-hubIvecoAfterSalesValidatorStaging
.PHONY: build-hubIvecoAfterSalesProcessorProduction
# .PHONY: build-hubIvecoAfterSalesProcessorStaging
.PHONY: build-hubIvecoAfterSalesMonitorProduction
# .PHONY: build-hubIvecoAfterSalesMonitorStaging

build-hubIvecoSalesValidatorProduction:
	$(MAKE) HANDLER=src/handlers/sale/validator.ts build-lambda-common

#build-hubIvecoSalesValidatorStaging:
#	$(MAKE) HANDLER=src/handlers/sale/validator.ts build-lambda-common

build-hubIvecoSalesProcessorProduction:
	$(MAKE) HANDLER=src/handlers/sale/processor.ts build-lambda-common

#build-hubIvecoSalesProcessorStaging:
#	$(MAKE) HANDLER=src/handlers/sale/processor.ts build-lambda-common

build-hubIvecoSalesMonitorProduction:
	$(MAKE) HANDLER=src/handlers/monitoring/dead-queue.ts build-lambda-common

#build-hubIvecoSalesMonitorStaging:
#	$(MAKE) HANDLER=src/handlers/monitoring/dead-queue.ts build-lambda-common

build-hubIvecoAfterSalesValidatorProduction:
	$(MAKE) HANDLER=src/handlers/after-sale/validator.ts build-lambda-common

#build-hubIvecoAfterSalesValidatorStaging:
#	$(MAKE) HANDLER=src/handlers/after-sale/validator.ts build-lambda-common

build-hubIvecoAfterSalesProcessorProduction:
	$(MAKE) HANDLER=src/handlers/after-sale/processor.ts build-lambda-common

#build-hubIvecoAfterSalesProcessorStaging:
#	$(MAKE) HANDLER=src/handlers/after-sale/processor.ts build-lambda-common

build-hubIvecoAfterSalesMonitorProduction:
	$(MAKE) HANDLER=src/handlers/monitoring/dead-queue.ts build-lambda-common

#build-hubIvecoAfterSalesMonitorStaging:
#	$(MAKE) HANDLER=src/handlers/monitoring/dead-queue.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-runtimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
