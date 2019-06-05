<template>
  <form id="form1" runat="server">
      <div class="container">
    <div
      class="alert alert-info"
      runat="server"
      style="max-height: 300px; overflow-y: scroll"
      id="divLog"
      clientidmode="Static"
    ></div>
    <div class="form-group col-lg-6">
      <asp:DropDownList
        CssClass="form-control margin-top15"
        id="ddlCategories"
        runat="server"
        ViewStateMode="Enabled"
        AutoPostBack="true"
        OnSelectedIndexChanged="ddlCategories_SelectedIndexChanged"
      ></asp:DropDownList>
    </div>
    <div class="form-group col-lg-6 margin-top15">
      <asp:CheckBox
        AutoPostBack="true"
        OnCheckedChanged="ddlCategories_SelectedIndexChanged"
        id="chkIsMacher"
        runat="server"
      />Shows only Macher groups
    </div>

    <div class="form-group col-lg-6 col-lg-pull-6 margin-top15">
      <label>Groups:</label>
      <asp:ListBox
        CssClass="form-control margin-top15"
        id="lstGroups"
        ClientIDMode="Static"
        runat="server"
        SelectionMode="Multiple"
        height="400"
      ></asp:ListBox>
    </div>

    <div class="form-group col-lg-12">
      <label>Messages (Split with 2 line breaks):</label>
      <textarea  rows="30"
        Columns="100"
          id="txtMessage"
          class="form-control margin-top15">
      </textarea>
    </div>
    <div class="form-group col-lg-12">
      <label>Attach a file:</label>
      <input type="file" onchange="previewFile()" id="file">
      <img src id="Image1" style="height: 200px" alt="Image preview...">
      <i class="fa fa-remove" style="cursor: pointer" onclick="removeFile()"></i>
    </div>

    <div class="form-group col-lg-4">
      <label>Delay in Hours:</label>
      <input type="number" id="txtDelay" class="form-control margin-top15" min="0">
    </div>

    <div class="form-group col-lg-12">
      <input class="btn btn-primary" type="button" value="WhatsApp" onclick="sendAllMessages()">
      <input class="btn btn-success" type="button" value="Tweeter" onclick="tweet()">
    </div>
      </div>
  </form>
</template>



<script>
export default {};
</script>
