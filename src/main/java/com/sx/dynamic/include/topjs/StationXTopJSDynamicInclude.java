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

		printWriter.println(content);
		
	}

	@Override
	public void register(
		DynamicInclude.DynamicIncludeRegistry dynamicIncludeRegistry) {
	
		dynamicIncludeRegistry.register(  "/html/common/themes/top_head.jsp#post" );
	}
}