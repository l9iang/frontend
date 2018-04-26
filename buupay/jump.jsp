<%@page import="org.takeback.util.MD5StringUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>交易详情</title>
        <!-- 调用css布局    -->
  	 <link rel="stylesheet" href="./BuuYou.css" type="text/css">
</head>
<%
String partner = "21609";//商户ID
String Key = "208a56bbfc7e39a2c27bc3e961b98ce7";//商户KEY
String orderstatus = request.getParameter("orderstatus");
String ordernumber = request.getParameter("ordernumber");
String paymoney = request.getParameter("paymoney");
String sign = request.getParameter("sign");
String attach = request.getParameter("attach");
String tradingstatus="";//交易状态
String tradingnote="";//交易备注信息
String signSource = String.format("partner=%s&ordernumber=%s&orderstatus=%s&paymoney=%s%s", partner, ordernumber, orderstatus, paymoney, Key);
System.out.println(signSource);
MD5StringUtil md5=new MD5StringUtil();
if (sign.equals(md5.MD5Encode(signSource)))//签名正确
{
	

if(orderstatus.equals("1")){
	
	tradingstatus="交易成功";
	tradingnote="";//交易备注信息			
	
}else{
	
	tradingstatus="交易失败";
	tradingnote="本次交易非法，请重试！";//交易备注信息	
}	
}
%>

<body>

        <form class="buuyouform">

            <div style="height: 50px" style="margin-top:30px;">
            </div>
            <div>
            
                <table class="tab" width="100%" border="0" align="center">
                    <tr>
                        <td align="center" colspan="2">交易详情
                        </td>
                    </tr>
                    
                    <!-- 交易单号 -->
                    <tr>
                        <td align="left" style="width: 150px;">交易单号:
                        </td>
                        <td><%=ordernumber %>
                        </td>
                    </tr>
                    
                    <!-- 支付金额 -->
                    <tr> 
                      <td align="left">支付金额:</td>
                      <td><%=paymoney %></td>
                    </tr>
                    
                    <!-- 付款用户 -->
                    <tr>
                        <td align="left">支付用户:
                        </td>
                        <td><%=attach%>                      </td>
                    </tr>
                    
                    <!-- 当前状态 -->
                     <tr>
                        <td align="left">当前状态:  
                        </td>
                        <td><%=tradingstatus %>
                        </td>
                     </tr>
                    
                    <!-- 交易备注 -->
                     <tr>
                        <td align="left">交易备注:
                        </td>
                        <td><%=tradingnote %></td>
                    </tr>
                    
                </table>
            </div>
  
        </form>
    	
   <% response.setHeader("Refresh","1;URL="+"http://hb.game0851.cn//#/tab/account");%>
                
</body>
</html>