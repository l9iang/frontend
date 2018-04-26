<%@page import="org.takeback.util.MD5StringUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.takeback.util.buupay.*" %>
<%@ page import="java.text.SimpleDateFormat,java.util.Date"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<%

String partner = "21609";//商户ID
String Key = "208a56bbfc7e39a2c27bc3e961b98ce7";//商户KEY
String orderstatus = request.getParameter("orderstatus");
String ordernumber = request.getParameter("ordernumber");
String sysnumber = request.getParameter("sysnumber");
String paymoney = request.getParameter("paymoney");
String sign = request.getParameter("sign");
String attach = request.getParameter("attach");
String time=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss:SSS").format(new Date());//当前时间
String signSource = String.format("partner=%s&ordernumber=%s&orderstatus=%s&paymoney=%s%s", partner, ordernumber, orderstatus, paymoney, Key);
MD5StringUtil md5=new MD5StringUtil();
if (sign.equals(md5.MD5Encode(signSource)))//签名正确
{			
			DBUtil dbutil = new DBUtil();
			Selectsql sel = new Selectsql();
			
if(orderstatus.equals("1")){
	//out.println(ordernumber+"<br/>");
	//out.println(paymoney+"<br/>");
	//out.println(time+"<br/>");
	//out.println(attach+"<br/>");
	//out.println(orderstatus+"<br/>");

	try{
	
	String str = sel.useradminquery("select ordernumber from pub_user_money_history","ordernumber");
	//out.println(str+"<br/>");
	if(!str.equals(ordernumber)){
		
			dbutil.executeUpdate("insert into pub_user_money_history(ordernumber,money,time,attach,sysnumber,orderstatus) values('"+ordernumber+"','"+paymoney+"','"+time+"','"+attach+"','"+sysnumber+"','"+orderstatus+"')");
			//out.println("insert into pub_user_money_history(ordernumber,money,time,attach,sysnumber,orderstatus) values('"+ordernumber+"','"+paymoney+"','"+time+"','"+attach+"','"+sysnumber+"','"+orderstatus+"')"+"<br/>");
			
			
			
			String sqlmoney = sel.useradminquery("select * from pub_user where userID='"+attach+"'","money");
			//out.println(sel.useradminquery("select * from pub_user where userID='"+attach+"'","money"));
			//out.println(sqlmoney);
			double newmoney = Double.valueOf(sqlmoney)+Double.valueOf(paymoney);
			//out.println(newmoney);
			String newsqlmoney = "update pub_user set money = '"+newmoney+"' where userID = '"+attach+"'"; 
			//out.println("newsqlmoney="+newsqlmoney);
			dbutil.executeUpdate(newsqlmoney);
			dbutil.close();
	}else{
		//out.println("订单号已存在!!"+"<br/>");
	//out.println("查询订单号:"+sel.useradminquery("select ordernumber from pub_user_money_history","ordernumber"+"<br/>"));
	}
		}catch (Exception e) {
			out.println("出错"+"<br/>");
		}
			
}
}
//
out.println("ok"+"<br/>");

%>
<body>

</body>
</html>