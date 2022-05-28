package com.sx.dynamic.include.topjs;

import java.io.IOException;
import java.io.PrintWriter;

import com.liferay.portal.kernel.servlet.taglib.BaseDynamicInclude;
import com.liferay.portal.kernel.servlet.taglib.DynamicInclude;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.service.component.annotations.Component;

/**
 * @author jerry
 */
@Component(
	immediate = true,
	service = DynamicInclude.class
)
public class StationXTopJSDynamicInclude extends BaseDynamicInclude {

	@Override
	public void include(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String key)
			throws IOException {
		
		PrintWriter printWriter = httpServletResponse.getWriter();
		
		String content = "<script charset=\"utf-8\" src=\"/o/com.sx.dynamic.include/js/station-x.js\" async ></script>";
		content += "<script charset=\"utf-8\" src=\"/o/com.sx.dynamic.include/js/mustache/mustache.min.js\" async ></script>";
		content += "<script charset=\"utf-8\" src=\"/o/com.sx.dynamic.include/js/jquery/confirm/jquery-confirm.min.js\" async ></script>";
		
		content += "<link rel=\"stylesheet\" href=\"/o/com.sx.dynamic.include/css/jquery/confirm/jquery-confirm.min.css\" >";

		printWriter.println(content);
		
	}

	@Override
	public void register(
		DynamicInclude.DynamicIncludeRegistry dynamicIncludeRegistry) {
	
		dynamicIncludeRegistry.register(  "/html/common/themes/top_head.jsp#post" );
	}
}