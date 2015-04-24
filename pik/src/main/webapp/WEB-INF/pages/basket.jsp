<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
        <jsp:include page="common/head.jsp"/>

	  <title>My first styled page</title>
	</head>
	<body id="${idBasket}">
        <jsp:include page="tags/navPanel.jsp" />
        <div type="hidden" style="display: none;"> <!-- work space js -->
            <jsp:include page="tags/record.jsp"/>
        </div>
		<div id="studentsForm">
        </div>
	</body>
</html>