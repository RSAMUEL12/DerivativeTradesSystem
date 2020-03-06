const filters = [
    ["#filter-creationDateLowerDayInput", /^\d{0,2}$/],
    ["#filter-creationDateLowerMonthInput", /^\d{0,2}$/],
    ["#filter-creationDateLowerYearInput", /^\d{0,4}$/],
    ["#filter-creationDateUpperDayInput", /^\d{0,2}$/],
    ["#filter-creationDateUpperMonthInput", /^\d{0,2}$/],
    ["#filter-creationDateUpperYearInput", /^\d{0,4}$/],
];

function init() {
    let elemCompanyListEmptyMessage = $("#companyListEmptyMessage");
    elemCompanyListEmptyMessage.hide();
    elemCompanyListEmptyMessage.removeClass("d-none");

    $("#companyList").on("show.bs.collapse", () => {
        $("#companyListCollapseSymbol").text("expand_less");
        if (isCompanyListEmpty()) {
            elemCompanyListEmptyMessage.show();
        }
    });

    $("#companyList").on("hide.bs.collapse", () => {
        $("#companyListCollapseSymbol").text("expand_more");
        elemCompanyListEmptyMessage.hide();
    });

    filters.forEach((x) => {
        setInputFilter($(x[0]), (v) => { return x[1].test(v) });
    });

    $("#companyInput").on("change", checkCompanyValidity);

    $("#addCompanyButton").click( () => {
        let company = new Company();
        loadCompanyToForm(company);
        showCompanyForm();
    });

    $("#saveCompanyButton").click( () => {
        let company = companyObjectFromForm();
        if (company.id != "") {
            api.patch.companies(company.id, company.getAPIObject(), () => showSuccess('Company updated.'), showError);
        }
        else {
            api.post.companies(company.getAPIObject(), () => showSuccess('Company saved.'), showError);
        }
        //TODO add visual feedback of the save to user
    });

    $("#discardChangesButton").click(() => {
        let company = new Company();
        loadCompanyToForm(company);
    });

    $("#doAdvancedSearch").click( () => {
        clearCompanyList();
        getCompanyList(filterObjectFromForm(), 'mostBoughtFrom', (companies) => {
            companies.forEach(addCompanyToUI);
        })
    });
}

$(document).ready(init);
