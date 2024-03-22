<template>
    <div>
        <Message severity="warn" :closable="false">
            This page is optimized for desktop, not mobile
        </Message>
        <Message severity="warn" :closable="false">
            Please make sure to delete the account after using it (by double clicking outside the buttons)
        </Message>

        <DataTable :value="accounts" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]"
            v-model:expandedRows="expandedRows" @row-dblclick="dbClicked" :filters="filters" :expander="true"
            sortMode="multiple">

            <template #header>
                <div>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </span>
                </div>
            </template>

            <Column :expander="true" headerStyle="width: 0.1%" />

            <Column header="Card Number" field="cardNumber">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-copy" @click="clibboardCopy(slotProps.data.cardNumber)"
                        style="width: 100%; max-width: max-content; padding: 10px 15px">
                        <i class="pi pi-copy" alt="Copy to Clipboard" />
                        {{ slotProps.data.cardNumber }}
                    </Button>
                </template>
            </Column>

            <Column header="CID" field="cid">
                <template #body="slotProps">
                    <Button type="button" icon="pi pi-copy" @click="clibboardCopy(slotProps.data.cid)"
                        style="width: 100%; max-width: max-content; padding: 10px 15px">
                        <i class="pi pi-copy" alt="Copy to Clipboard" />
                        {{ slotProps.data.cid }}
                    </Button>
                </template>
            </Column>

            <Column field="scenario">
                <template #body="slotProps">
                    {{ slotProps.data.scenario }}
                </template>

                <template #header>
                    <Dropdown v-model="filters['scenario'].value" :options="this.uniqueScenarios" placeholder="Scenario"
                        class="p-column-filter" style="min-width: 12rem" :showClear="true" />
                </template>
            </Column>

            <Column header="Existing/New" field="customerType" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.customerType }}
                </template>
            </Column>

            <Column header="Language" field="language" sortable>
                <template #body="slotProps">
                    {{ slotProps.data.language }}
                </template>
            </Column>

            <template #footer>
                In total there are {{ accounts ? accounts.length : 0 }} accounts.
            </template>
            <template #empty>No records found</template>

            <template #expansion="slotProps">
                <div>
                    {{ slotProps.data }}
                </div>
            </template>
        </DataTable>

        <ConfirmDialog />
        <Toast position="top-center" />
    </div>
</template>

<script>

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Message from "primevue/message";
import ConfirmDialog from "primevue/confirmdialog";
import Button from "primevue/button";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
import Dropdown from "primevue/dropdown";

export default {
    name: "table-example",
    data() {
        return {
            accounts: [
                { "firstName": "Test", "LastName": "Testing", "transit": "00000", "dateOfBirth": "1986-12-28", "cid": "0000001", "cardNumber": "0213123121", "scenario": "Basic Banking", "customerType": "Existing", "language": "E" },
                { "firstName": "Test1", "LastName": "Testing1", "transit": "00001", "dateOfBirth": "1986-12-28", "cid": "0000002", "cardNumber": "0213123123", "scenario": "Scene Plus", "customerType": "New", "language": "E" },
                { "firstName": "Test2", "LastName": "Testing2", "transit": "00002", "dateOfBirth": "1986-12-28", "cid": "0000003", "cardNumber": "1111111111", "scenario": "Buiness Customer", "customerType": "Existing", "language": "F" },
                { "firstName": "Test3", "LastName": "Testing3", "transit": "00003", "dateOfBirth": "1986-12-28", "cid": "0000004", "cardNumber": "0123145511", "scenario": "Basic Banking", "customerType": "New", "language": "E" },
                { "firstName": "Test4", "LastName": "Testing4", "transit": "00004", "dateOfBirth": "1986-12-28", "cid": "0000005", "cardNumber": "0412515111", "scenario": "Scene Plus", "customerType": "Existing", "language": "F" },

            ],
            expandedRows: [],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                scenario: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            uniqueScenarios: ["Basic Banking", "Scene Plus", "Buiness Customer"],
        }
    },
    methods: {
        dbClicked(e) {
            let cid = e.data.cid;
            this.$confirm.require({
                message: `Are you sure you want to delete cid ${cid} ?`,
                header: "Confirmation",
                icon: "pi pi-exclamation-triangle"
            })
        },
        clibboardCopy(e) {
            const textArea = document.createElement("textarea");
            textArea.value = e;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                this.$toast.add({
                    severity: "success",
                    summary: "Copied to Clipboard",
                    life: 2000,
                })
            } catch (err) {
                console.error("Unable to copy to clipboard", err);
                this.$toast.add({
                    severity: "error",
                    summary: "Not copied to Clipboard",
                    life: 2000,
                })
            }
            document.body.removeChild(textArea);
        }
    },
    components: {
        DataTable,
        Column,
        Message,
        ConfirmDialog,
        Button,
        Toast,
        InputText,
        Dropdown
    }
}
</script>